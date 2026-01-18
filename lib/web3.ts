import Web3 from 'web3'

// TODO: Replace with your actual Deployed Contract Address from Remix
export const CONTRACT_ADDRESS = "0xcb4e70bA47171B261D4D6070d241AE0F0b7CA23F"

export const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "driverAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "DriverRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "driver",
				"type": "address"
			}
		],
		"name": "RideAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			}
		],
		"name": "RideCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			}
		],
		"name": "RideCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "driver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RideFinalized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "passenger",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "pickup",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "destination",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "RideRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			}
		],
		"name": "RideStarted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			}
		],
		"name": "acceptRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			}
		],
		"name": "cancelRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			}
		],
		"name": "completeRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			}
		],
		"name": "confirmArrival",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "drivers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "plateNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vehicleType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "rateType",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllRides",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "passenger",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "driver",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "pickup",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "destination",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "enum BlockRides.RideStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "createdAt",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockRides.Ride[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_plateNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_vehicleType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rateType",
				"type": "string"
			}
		],
		"name": "registerDriver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pickup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_destination",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "requestRide",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rides",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "passenger",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "driver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "pickup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "destination",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "enum BlockRides.RideStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			}
		],
		"name": "startRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] as const

export const getContract = (provider: any) => {
    const web3 = new Web3(provider)
    return new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
}