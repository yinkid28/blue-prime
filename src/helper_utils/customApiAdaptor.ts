import {
  DataManager,
  WebApiAdaptor,
  Query,
  RequestOptions,
} from "@syncfusion/ej2-data";
import { getJWT } from "@/services/httpInstance/wrappedinstance";
// Define a custom type for the request object to specify `params`
interface RequestWithParams {
  params?: { [key: string]: any };
}

class CustomWebApiAdaptor extends WebApiAdaptor {
  processQuery(
    dm: DataManager,
    query: Query,
    hierarchyFilters?: any
  ): RequestOptions {
    // Get the default request from WebApiAdaptor
    const request = super.processQuery(dm, query, hierarchyFilters) as any;

    // Check if the URL has `$inlinecount=allpages` and remove it
    if (request.url && request.url.includes("/?$inlinecount=allpages")) {
      request.url = request.url.replace("/?$inlinecount=allpages", "");
    }

    return request;
  }
}
export default CustomWebApiAdaptor;
