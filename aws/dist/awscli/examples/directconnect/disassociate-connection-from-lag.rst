<<<<<<< HEAD
**To disassociate a connection from a LAG**

The following example disassociates the specified connection from the specified LAG.

Command::

  aws directconnect disassociate-connection-from-lag --lag-id dxlag-fhccu14t --connection-id  dxcon-fg9607vm

Output::

  {
    "ownerAccount": "123456789012", 
    "connectionId": "dxcon-fg9607vm", 
    "connectionState": "requested", 
    "bandwidth": "1Gbps", 
    "location": "EqDC2", 
    "connectionName": "Con2ForLag", 
    "region": "us-east-1"
  }
=======
**To disassociate a connection from a LAG**

The following example disassociates the specified connection from the specified LAG.

Command::

  aws directconnect disassociate-connection-from-lag --lag-id dxlag-fhccu14t --connection-id  dxcon-fg9607vm

Output::

  {
    "ownerAccount": "123456789012", 
    "connectionId": "dxcon-fg9607vm", 
    "connectionState": "requested", 
    "bandwidth": "1Gbps", 
    "location": "EqDC2", 
    "connectionName": "Con2ForLag", 
    "region": "us-east-1"
  }
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
