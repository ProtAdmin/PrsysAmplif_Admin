<<<<<<< HEAD
**To integrate with AWS Organizations and delegate a member account as the IPAM account**

The following ``enable-ipam-organization-admin-account`` example integrates IPAM with AWS Organizations and delegates a member account as the IPAM account. ::

    aws ec2 enable-ipam-organization-admin-account \
        --delegated-admin-account-id 320805250157

Output::

    {
        "Success": true
    }

=======
**To integrate with AWS Organizations and delegate a member account as the IPAM account**

The following ``enable-ipam-organization-admin-account`` example integrates IPAM with AWS Organizations and delegates a member account as the IPAM account. ::

    aws ec2 enable-ipam-organization-admin-account \
        --delegated-admin-account-id 320805250157

Output::

    {
        "Success": true
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Integrate IPAM with AWS Organizations <https://docs.aws.amazon.com/vpc/latest/ipam/enable-integ-ipam.html>`__ in the *Amazon VPC IPAM User Guide*. 