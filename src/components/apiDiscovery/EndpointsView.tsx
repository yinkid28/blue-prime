import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false, // Disable server-side rendering for this component
});
export default function EndpointView() {
  return (
    <div className="">
      <SwaggerUI url="http://bct-product.westeurope.cloudapp.azure.com:8060/webjars/swagger-ui/index.html" />
    </div>
  );
}
