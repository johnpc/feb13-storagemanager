import * as s3 from "aws-cdk-lib/aws-s3";
import {defineBackend} from "@aws-amplify/backend";
import {auth} from "./auth/resource";
import {storage} from "./storage/resource";

const backend = defineBackend({
  auth,
  storage,
});

const bucket = backend.storage.resources.bucket;

// allow any guest (unauthenticated) user to read from and write to the bucket
const unauthRole = backend.auth.resources.unauthenticatedUserIamRole;
const authRole = backend.auth.resources.authenticatedUserIamRole;
bucket.grantReadWrite(unauthRole);
bucket.grantReadWrite(authRole);

(bucket as s3.Bucket).addCorsRule({
  allowedHeaders: ["*"],
  allowedMethods: [
    s3.HttpMethods.GET,
    s3.HttpMethods.HEAD,
    s3.HttpMethods.PUT,
    s3.HttpMethods.POST,
    s3.HttpMethods.DELETE,
  ],
  allowedOrigins: ["*"],
  exposedHeaders: [
    "x-amz-server-side-encryption",
    "x-amz-request-id",
    "x-amz-id-2",
    "ETag",
  ],
  maxAge: 3000,
});
