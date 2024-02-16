# StorageManager Bug Demo

**UPDATE:** Confirmed fixed in `@aws-amplify/ui-react-storage@3.0.14`

## Bug description

I am using the `StorageManager` to upload files to S3. Specifically I am using the `path` prop, which according to [the docs](https://ui.docs.amplify.aws/react/connected-components/storage/storagemanager) is

```
A path to put files in the s3 bucket. This will be prepended to the key sent to s3 for each file.
```

However, when I upload files, I am not observing the file uploaded under the specified `path`.

## Reproduction steps

Run the following bash commands to set up the environment

```bash
git clone https://github.com/johnpc/feb13-storagemanager
cd feb13-storagemanager
npm install
npx amplify sandbox
npm run dev
```

Then navigate to http://localhost:3000 and upload a file via the file manager.

**EXPECTED:**

Because `src/app/page.tsx` specifies `path={"folder"}`

```typescript
<StorageManager
  acceptedFileTypes={["image/*"]}
  path={"folder"}
  ...
/>
```

I expect the file uploaded to be uploaded to the S3 bucket nested under a folder named `folder`.

**ACTUAL:**

The file is uploaded to S3, but not nested under any path. The file is uploaded to the root of the s3 bucket.
