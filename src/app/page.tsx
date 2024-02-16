"use client";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import config from "../../amplifyconfiguration.json";
Amplify.configure(config, { ssr: true });
import {StorageManager} from "@aws-amplify/ui-react-storage";
import {useState} from "react";

function Home() {
  const [key, setKey] = useState<string>();

  const onUploadSuccess = (event: {key?: string}) => {
    setKey(event.key);
  };

  return (
    <>
      <StorageManager
        acceptedFileTypes={["image/*"]}
        path={"folder/"}
        accessLevel="guest"
        maxFileCount={5}
        onUploadSuccess={onUploadSuccess}
        isResumable
      />
      <p>Last uploaded key: {key ?? 'None'}</p>
    </>
  );
}

export default Home;
