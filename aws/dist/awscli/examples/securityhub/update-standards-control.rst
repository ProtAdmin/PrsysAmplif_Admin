<<<<<<< HEAD
**Example 1: To disable a control**

The following ``update-standards-control`` example disables the PCI.AutoScaling.1 control. ::

=======
**Example 1: To disable a control**

The following ``update-standards-control`` example disables the PCI.AutoScaling.1 control. ::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    aws securityhub update-standards-control \
        --standards-control-arn "arn:aws:securityhub:us-west-1:123456789012:control/pci-dss/v/3.2.1/PCI.AutoScaling.1" \
        --control-status "DISABLED" \
        --disabled-reason "Not applicable for my service"

This command produces no output.

<<<<<<< HEAD
**Example 2: To enable a control**

The following ``update-standards-control`` example enables the PCI.AutoScaling.1 control. ::

=======
**Example 2: To enable a control**

The following ``update-standards-control`` example enables the PCI.AutoScaling.1 control. ::

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
    aws securityhub update-standards-control \
        --standards-control-arn "arn:aws:securityhub:us-west-1:123456789012:control/pci-dss/v/3.2.1/PCI.AutoScaling.1" \
        --control-status "ENABLED"

<<<<<<< HEAD
This command produces no output.

For more information, see `Disabling and enabling individual controls <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-enable-disable-controls.html>`__ in the *AWS Security Hub User Guide*.
=======
This command produces no output.

For more information, see `Disabling and enabling individual controls <https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-enable-disable-controls.html>`__ in the *AWS Security Hub User Guide*.
>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
