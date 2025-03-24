<<<<<<< HEAD
**List all the node groups in an Amazon EKS cluster**

The following ``list-nodegroups`` example list all the node groups in an Amazon EKS cluster. ::

    aws eks list-nodegroups \
        --cluster-name my-eks-cluster

Output::

    {
        "nodegroups": [
            "my-eks-managed-node-group",
            "my-eks-nodegroup"
        ]
    }
=======
**List all the node groups in an Amazon EKS cluster**

The following ``list-nodegroups`` example list all the node groups in an Amazon EKS cluster. ::

    aws eks list-nodegroups \
        --cluster-name my-eks-cluster

Output::

    {
        "nodegroups": [
            "my-eks-managed-node-group",
            "my-eks-nodegroup"
        ]
    }
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
