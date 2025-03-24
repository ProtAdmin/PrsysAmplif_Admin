<<<<<<< HEAD
**To list interconnects**

The following ``describe-interconnects`` command lists the interconnects owned by your AWS account::

  aws directconnect describe-interconnects

Output::

  {
      "interconnects": [
          {
              "region": "sa-east-1", 
              "bandwidth": "1Gbps", 
              "location": "TIVIT", 
              "interconnectName": "1G Interconnect to AWS", 
              "interconnectId": "dxcon-fgktov66", 
              "interconnectState": "down"
          }
      ]
=======
**To list interconnects**

The following ``describe-interconnects`` command lists the interconnects owned by your AWS account::

  aws directconnect describe-interconnects

Output::

  {
      "interconnects": [
          {
              "region": "sa-east-1", 
              "bandwidth": "1Gbps", 
              "location": "TIVIT", 
              "interconnectName": "1G Interconnect to AWS", 
              "interconnectId": "dxcon-fgktov66", 
              "interconnectState": "down"
          }
      ]
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
  }