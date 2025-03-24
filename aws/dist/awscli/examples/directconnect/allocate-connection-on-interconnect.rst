<<<<<<< HEAD
**To create a hosted connection on an interconnect**

The following ``allocate-connection-on-interconnect`` command creates a hosted connection on an interconnect::

  aws directconnect allocate-connection-on-interconnect --bandwidth 500Mbps --connection-name mydcinterconnect --owner-account 123456789012 --interconnect-id dxcon-fgktov66 --vlan 101

Output::

  {
      "partnerName": "TIVIT", 
      "vlan": 101, 
      "ownerAccount": "123456789012", 
      "connectionId": "dxcon-ffzc51m1", 
      "connectionState": "ordering", 
      "bandwidth": "500Mbps", 
      "location": "TIVIT", 
      "connectionName": "mydcinterconnect", 
      "region": "sa-east-1"
=======
**To create a hosted connection on an interconnect**

The following ``allocate-connection-on-interconnect`` command creates a hosted connection on an interconnect::

  aws directconnect allocate-connection-on-interconnect --bandwidth 500Mbps --connection-name mydcinterconnect --owner-account 123456789012 --interconnect-id dxcon-fgktov66 --vlan 101

Output::

  {
      "partnerName": "TIVIT", 
      "vlan": 101, 
      "ownerAccount": "123456789012", 
      "connectionId": "dxcon-ffzc51m1", 
      "connectionState": "ordering", 
      "bandwidth": "500Mbps", 
      "location": "TIVIT", 
      "connectionName": "mydcinterconnect", 
      "region": "sa-east-1"
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
  }