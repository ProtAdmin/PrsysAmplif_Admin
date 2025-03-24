<<<<<<< HEAD
**To associate a hosted connection with a LAG**

The following example associates the specified hosted connection with the specified LAG.

Command::

  aws directconnect associate-hosted-connection --parent-connection-id dxlag-fhccu14t --connection-id dxcon-fg9607vm

Output::

  {
    "partnerName": "TIVIT", 
    "vlan": 101, 
    "ownerAccount": "123456789012", 
    "connectionId": "dxcon-fg9607vm", 
    "lagId": "dxlag-fhccu14t", 
    "connectionState": "ordering", 
    "bandwidth": "500Mbps", 
    "location": "TIVIT", 
    "connectionName": "mydcinterconnect", 
    "region": "sa-east-1"
=======
**To associate a hosted connection with a LAG**

The following example associates the specified hosted connection with the specified LAG.

Command::

  aws directconnect associate-hosted-connection --parent-connection-id dxlag-fhccu14t --connection-id dxcon-fg9607vm

Output::

  {
    "partnerName": "TIVIT", 
    "vlan": 101, 
    "ownerAccount": "123456789012", 
    "connectionId": "dxcon-fg9607vm", 
    "lagId": "dxlag-fhccu14t", 
    "connectionState": "ordering", 
    "bandwidth": "500Mbps", 
    "location": "TIVIT", 
    "connectionName": "mydcinterconnect", 
    "region": "sa-east-1"
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
  }