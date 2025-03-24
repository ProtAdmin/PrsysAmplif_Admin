<<<<<<< HEAD
**To delete an audit finding suppression**

The following ``delete-audit-suppression`` example deletes an audit finding suppression for DEVICE_CERTIFICATE_EXPIRING_CHECK. ::

    aws iot delete-audit-suppression \
        --check-name DEVICE_CERTIFICATE_EXPIRING_CHECK \
        --resource-identifier deviceCertificateId="c7691e<shortened>"

This command produces no output.

=======
**To delete an audit finding suppression**

The following ``delete-audit-suppression`` example deletes an audit finding suppression for DEVICE_CERTIFICATE_EXPIRING_CHECK. ::

    aws iot delete-audit-suppression \
        --check-name DEVICE_CERTIFICATE_EXPIRING_CHECK \
        --resource-identifier deviceCertificateId="c7691e<shortened>"

This command produces no output.

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `Audit finding suppressions <https://docs.aws.amazon.com/iot/latest/developerguide/audit-finding-suppressions.html>`__ in the *AWS IoT Developers Guide*.