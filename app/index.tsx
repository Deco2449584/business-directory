import { Redirect } from "expo-router";
import "dotenv/config";
export default function Index() {
  return <Redirect href={"/home"} />;
}
