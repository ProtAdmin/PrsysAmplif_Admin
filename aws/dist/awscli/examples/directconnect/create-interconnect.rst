<<<<<<< HEAD
**To create an interconnect between a partner's network and AWS**

The following ``create-interconnect`` command creates an interconnect between an AWS Direct Connect partner's network and a specific AWS Direct Connect location::

  aws directconnect create-interconnect --interconnect-name "1G Interconnect to AWS" --bandwidth 1Gbps --location TIVIT

Output::

  {
      "region": "sa-east-1", 
      "bandwidth": "1Gbps", 
      "location": "TIVIT", 
      "interconnectName": "1G Interconnect to AWS", 
      "interconnectId": "dxcon-fgktov66", 
      "interconnectState": "requested"
=======
**To create an interconnect between a partner's network and AWS**

The following ``create-interconnect`` command creates an interconnect between an AWS Direct Connect partner's network and a specific AWS Direct Connect location::

  aws directconnect create-interconnect --interconnect-name "1G Interconnect to AWS" --bandwidth 1Gbps --location TIVIT

Output::

  {
      "region": "sa-east-1", 
      "bandwidth": "1Gbps", 
      "location": "TIVIT", 
      "interconnectName": "1G Interconnect to AWS", 
      "interconnectId": "dxcon-fgktov66", 
      "interconnectState": "requested"
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
  }