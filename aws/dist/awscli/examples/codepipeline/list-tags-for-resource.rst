<<<<<<< HEAD
**To list tags**

The following ``list-tags-for-resource`` example retrieves a list of all tags attached to the specified pipeline resource. ::

    aws codepipeline list-tags-for-resource \
        --resource-arn arn:aws:codepipeline:us-east-1:123456789012:MyPipeline

Output::

    {
        "tags": {
            "Project": "ProjectA",
            "IscontainerBased": "true"
        }
    }

=======
**To list tags**

The following ``list-tags-for-resource`` example retrieves a list of all tags attached to the specified pipeline resource. ::

    aws codepipeline list-tags-for-resource \
        --resource-arn arn:aws:codepipeline:us-east-1:123456789012:MyPipeline

Output::

    {
        "tags": {
            "Project": "ProjectA",
            "IscontainerBased": "true"
        }
    }

>>>>>>> e0e62a74754755ef19912bd622dbb081f288b898
For more information, see `View tags for a pipeline (CLI) <https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-tag.html#pipelines-tag-list-cli>`__ in the *AWS CodePipeline User Guide*.