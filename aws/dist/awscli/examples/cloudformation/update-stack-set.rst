<<<<<<< HEAD
**To update a stack set**

The following ``update-stack-set`` example adds a tag with the key name ``Owner`` and a value of ``IT`` to the stack instances in the specified stack set. ::

    aws cloudformation update-stack-set \
        --stack-set-name my-stack-set \
        --use-previous-template \
        --tags Key=Owner,Value=IT

Output::

    {
        "OperationId": "e2b60321-6cab-xmpl-bde7-530c6f47950e"
    }
=======
**To update a stack set**

The following ``update-stack-set`` example adds a tag with the key name ``Owner`` and a value of ``IT`` to the stack instances in the specified stack set. ::

    aws cloudformation update-stack-set \
        --stack-set-name my-stack-set \
        --use-previous-template \
        --tags Key=Owner,Value=IT

Output::

    {
        "OperationId": "e2b60321-6cab-xmpl-bde7-530c6f47950e"
    }
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
