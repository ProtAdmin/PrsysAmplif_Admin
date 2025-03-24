import App from "../src/App";
import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports'; 

Amplify.configure(awsExports);

export default function Home() {
  return <App />;
}
