type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <h2>こんにちは、{name}さん！</h2>;
}

export default Greeting;