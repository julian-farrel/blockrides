// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BlockRides {

    enum RideStatus { 
        Requested,          // Passenger created & deposited ETH
        Accepted,           // Driver accepted
        Started,            // Driver picked up passenger
        CompletedByDriver,  // Driver arrived at destination
        Finalized,          // Passenger confirmed, funds released
        Cancelled           // Passenger cancelled before driver accepted
    }

    struct Driver {
        string name;
        string plateNumber;
        string vehicleType;
        string rateType;
        bool isRegistered;
        address wallet;
    }

    struct Ride {
        uint256 id;
        address passenger;
        address driver;
        string pickup;
        string destination;
        uint256 price;      // Price in Wei
        RideStatus status;
        uint256 createdAt;
    }

    // --- STATE VARIABLES ---
    mapping(address => Driver) public drivers;
    Ride[] public rides;

    // --- EVENTS ---
    event DriverRegistered(address indexed driverAddress, string name);
    event RideRequested(uint256 indexed rideId, address indexed passenger, string pickup, string destination, uint256 price);
    event RideAccepted(uint256 indexed rideId, address indexed driver);
    event RideStarted(uint256 indexed rideId);
    event RideCompleted(uint256 indexed rideId);
    event RideFinalized(uint256 indexed rideId, address indexed driver, uint256 amount);
    event RideCancelled(uint256 indexed rideId);

    // --- MODIFIERS ---
    modifier onlyRegisteredDriver() {
        require(drivers[msg.sender].isRegistered, "Caller is not a registered driver");
        _;
    }
    modifier onlyPassenger(uint256 _rideId) {
        require(rides[_rideId].passenger == msg.sender, "Caller is not the passenger");
        _;
    }
    modifier onlyDriver(uint256 _rideId) {
        require(rides[_rideId].driver == msg.sender, "Caller is not the driver");
        _;
    }
    modifier inStatus(uint256 _rideId, RideStatus _status) {
        require(rides[_rideId].status == _status, "Invalid ride status for this action");
        _;
    }

    // --- FUNCTIONS ---
    // 1. Driver Registration
    function registerDriver(string memory _name, string memory _plateNumber, string memory _vehicleType, string memory _rateType) external {
        require(!drivers[msg.sender].isRegistered, "Driver already registered");
        drivers[msg.sender] = Driver({
            name: _name,
            plateNumber: _plateNumber,
            vehicleType: _vehicleType,
            rateType: _rateType,
            isRegistered: true,
            wallet: msg.sender
        });
        emit DriverRegistered(msg.sender, _name);
    }

    // 2. Passenger Requests & Funds Ride
    function requestRide(string memory _pickup, string memory _destination, uint256 _price) external payable {
        require(msg.value == _price, "Sent ETH amount must match the price");

        uint256 rideId = rides.length;
        rides.push(Ride({
            id: rideId,
            passenger: msg.sender,
            driver: address(0),
            pickup: _pickup,
            destination: _destination,
            price: _price,
            status: RideStatus.Requested, // Auto-funded state
            createdAt: block.timestamp
        }));

        emit RideRequested(rideId, msg.sender, _pickup, _destination, _price);
    }

    // 3. Driver Accepts Ride
    function acceptRide(uint256 _rideId) external onlyRegisteredDriver inStatus(_rideId, RideStatus.Requested) {
        rides[_rideId].driver = msg.sender;
        rides[_rideId].status = RideStatus.Accepted;
        emit RideAccepted(_rideId, msg.sender);
    }

    // 4. Driver Starts Ride
    function startRide(uint256 _rideId) external onlyDriver(_rideId) inStatus(_rideId, RideStatus.Accepted) {
        rides[_rideId].status = RideStatus.Started;
        emit RideStarted(_rideId);
    }

    // 5. Driver Completes Ride
    function completeRide(uint256 _rideId) external onlyDriver(_rideId) inStatus(_rideId, RideStatus.Started) {
        rides[_rideId].status = RideStatus.CompletedByDriver;
        emit RideCompleted(_rideId);
    }

    // 6. Passenger Confirms & Funds Released
    function confirmArrival(uint256 _rideId) external onlyPassenger(_rideId) inStatus(_rideId, RideStatus.CompletedByDriver) {
        rides[_rideId].status = RideStatus.Finalized;
        
        // Transfer the held funds to the driver
        (bool success, ) = rides[_rideId].driver.call{value: rides[_rideId].price}("");
        require(success, "Transfer failed.");

        emit RideFinalized(_rideId, rides[_rideId].driver, rides[_rideId].price);
    }

    // 7. Cancel Ride
    // If no driver accepts, passenger can cancel and get money back
    function cancelRide(uint256 _rideId) external onlyPassenger(_rideId) inStatus(_rideId, RideStatus.Requested) {
        rides[_rideId].status = RideStatus.Cancelled;
        
        // Refund passenger
        (bool success, ) = rides[_rideId].passenger.call{value: rides[_rideId].price}("");
        require(success, "Refund failed.");

        emit RideCancelled(_rideId);
    }

    function getAllRides() external view returns (Ride[] memory) {
        return rides;
    }
}