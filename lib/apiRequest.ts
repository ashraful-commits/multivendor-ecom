import toast from "react-hot-toast";

interface ErrorResponse {
  status: number;
}

export async function makePostRequest(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  endpoint: string,
  data: any, 
  resourceName: string,
  reset?: () => void,
  redirect?: () => void
): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
     if(reset) reset();
      if (redirect) redirect();
    } else {
      setLoading(false);
      const errorResponse: ErrorResponse = await response.json();
      if (errorResponse.status === 409) {
        toast.error(`${resourceName} Already exist!`);
      } else {
        toast.error("Something Went wrong");
      }
    }
  } catch (error) {
    setLoading(false);
    //console.log(error);
  }
}

export async function makePutRequest(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  endpoint: string,
  data: any, // Adjust this to the type of your data
  resourceName: string,
  redirect?: () => void,
  reset?: () => void
): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setLoading(false);
      toast.success(`${resourceName} Updated Successfully`);
      if(redirect) redirect();
    } else {
      setLoading(false);
      toast.error("Something Went wrong");
    }
  } catch (error) {
    setLoading(false);
    //console.log(error);
  }
}

export async function getData(endpoint: string): Promise<any> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    //console.log(error);
    throw new Error("Failed to fetch data");
  }
}
