import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import { Loader } from "lucide-react";
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage")
);
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const FaqsPage = lazy(() => import("./pages/FaqsPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const VerifyOtpModel = lazy(() => import("@/components/models/verifyOTPModel"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ProductDetailsPage = lazy(() => import("@/pages/ProductDetailsPage"));

export default function AppRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/search" element={<span>search page</span>} />

      <Route
        path="/terms-and-use"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Layout>
              <TermsAndConditionsPage />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Layout>
              <PrivacyPolicyPage />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/faqs"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Layout>
              <FaqsPage />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/register"
        element={
          <Suspense
            fallback={
              <div>
                <Loader className="animate-spin transition-all" />
              </div>
            }
          >
            <Layout>
              <RegisterPage />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense
            fallback={
              <div>
                <Loader className="animate-spin transition-all" />
              </div>
            }
          >
            <Layout>
              <LoginPage />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/verify"
        element={
          <Suspense
            fallback={
              <div>
                <Loader className="animate-spin transition-all" />
              </div>
            }
          >
            <Layout>
              <VerifyOtpModel />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/product/:productId"
        element={
          <Suspense
            fallback={
              <div>
                <Loader className="animate-spin transition-all" />
              </div>
            }
          >
            <Layout>
              <ProductDetailsPage />
            </Layout>
          </Suspense>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
