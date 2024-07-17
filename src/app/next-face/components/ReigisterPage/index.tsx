import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => (
  <div className="container mx-auto px-4 mt-4 flex justify-center grow h-screen items-center">
    <div className=" w-full lg:w-4/12">
      <div className="relative bg-blue-50 flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-200 border-0">
        <div className="rounded-t mb-0 px-6 py-6">
          <div className="text-center mb-3">
            <h6 className="text-blueGray-500 text-sm font-bold">Sign Up</h6>
          </div>
          <div className="btn-wrapper text-center"></div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <Suspense fallback={<p>Loading...</p>}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterPage;
