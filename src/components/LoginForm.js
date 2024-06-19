import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Perform login logic here (e.g., authentication, form validation)

    // Navigate to MainPage after successful login
    navigate("/MainPage");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login logic here, such as calling an authentication API
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const myStyles = {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const myStyles1 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
  };
  //fontFamily: "Red Hat Display",

  const inputStyles = {
    fontFamily: "Red Hat Display",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    margin: "10px",
  };

  const buttonStyles = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "10px",
    backgroundColor: "#4CB963",
    marginBottom: "90px",
  };
  const DividerHorizontalLoginIcon = () => {
    return (
      <svg
        width="556"
        height="2"
        viewBox="0 0 556 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1.00006L556 1.00001" stroke="#485763" stroke-width="0.4" />
      </svg>
    );
  };
  const MainIcon = () => {
    return (
      <svg
        width="44"
        height="27"
        viewBox="0 0 44 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40.7731 3.68892C39.0854 2.00165 36.8392 0.989406 34.4571 0.84268C32.0753 0.695954 29.7218 1.42487 27.8397 2.89224C26.1212 1.55704 24.0069 0.832038 21.8305 0.831616C19.6542 0.831195 17.5397 1.55538 15.8206 2.88991C13.8599 1.35147 11.3861 0.619364 8.90395 0.843064C6.42185 1.06676 4.11873 2.2294 2.46477 4.09361C0.810815 5.95782 -0.0692446 8.38301 0.00425985 10.8741C0.0777644 13.3652 1.09929 15.7343 2.86029 17.4977L8.87432 23.5126C8.87898 23.5171 8.88364 23.5215 8.88888 23.5261C8.89412 23.5308 8.89558 23.533 8.89892 23.5363C8.90518 23.5426 8.91188 23.5483 8.91814 23.5545C9.01373 23.6491 9.11077 23.7413 9.20927 23.8311C9.25993 23.8775 9.31117 23.9225 9.3627 23.9678C9.40452 24.0042 9.44654 24.0403 9.48876 24.0759C11.2031 25.5285 13.3652 26.347 15.6117 26.3936C17.8583 26.4404 20.0524 25.7125 21.8257 24.3323C23.7077 25.7996 26.0612 26.5286 28.4431 26.3818C30.8251 26.2351 33.0714 25.2228 34.7591 23.5356L40.7732 17.5216C42.6049 15.6858 43.6334 13.1984 43.6334 10.6052C43.6334 8.01198 42.6047 5.52466 40.7731 3.68892ZM21.8286 3.37916C23.2585 3.37824 24.6565 3.80156 25.8456 4.59552C27.0349 5.38947 27.9617 6.51838 28.5091 7.83935C29.0564 9.16033 29.1995 10.614 28.9203 12.0163C28.6411 13.4187 27.9521 14.7067 26.9406 15.7173L21.8286 20.8291L16.7165 15.7173C15.705 14.7067 15.016 13.4187 14.7368 12.0163C14.4576 10.6139 14.6007 9.16027 15.148 7.83929C15.6954 6.5183 16.6223 5.3894 17.8115 4.59546C19.0007 3.80151 20.3987 3.37821 21.8286 3.37916ZM8.58479 16.6195C8.58219 15.6697 8.76802 14.7289 9.13149 13.8514C9.49497 12.9739 10.0289 12.1773 10.7023 11.5075L12.0629 10.1469C11.9971 11.5069 12.2165 12.8657 12.7073 14.1357C13.198 15.4058 13.9491 16.5591 14.9122 17.5216L19.9197 22.529C18.8396 23.2855 17.5726 23.7311 16.2567 23.817C14.9409 23.9029 13.6266 23.626 12.4574 23.0164C11.2881 22.4066 10.3086 21.4878 9.62566 20.3596C8.94275 19.2317 8.58261 17.9377 8.5845 16.6191L8.58479 16.6195ZM4.66428 15.6933C3.38469 14.414 2.6314 12.7013 2.55322 10.8936C2.47504 9.0859 3.07763 7.31459 4.24198 5.92961C5.40633 4.54461 7.04777 3.64665 8.84202 3.41309C10.6363 3.17953 12.4529 3.62737 13.933 4.66814L8.89805 9.7031C7.98694 10.6093 7.26462 11.6871 6.77288 12.8743C6.28116 14.0615 6.02979 15.3345 6.03332 16.6195C6.03332 16.7712 6.03686 16.9223 6.04395 17.0729L4.66428 15.6933ZM27.8431 23.8487C26.366 23.8522 24.9239 23.3998 23.7136 22.5532L28.7456 17.5216C29.7088 16.5591 30.4598 15.4058 30.9505 14.1357C31.4412 12.8656 31.6607 11.5069 31.5949 10.1469L32.9555 11.5075C33.9666 12.5186 34.655 13.8068 34.9339 15.2092C35.2129 16.6115 35.0697 18.0651 34.5224 19.3861C33.9752 20.7071 33.0485 21.8361 31.8597 22.6305C30.6707 23.4248 29.273 23.8487 27.8431 23.8487ZM38.9691 15.7173L37.6134 17.0729C37.6203 16.9224 37.6238 16.7713 37.6241 16.6195C37.6276 15.3345 37.3762 14.0615 36.8845 12.8743C36.3927 11.6871 35.6703 10.6093 34.7592 9.7031L29.7277 4.67149C31.2105 3.63969 33.0258 3.2004 34.8163 3.4401C36.6067 3.67979 38.2426 4.58112 39.4017 5.9666C40.5609 7.35207 41.1593 9.1213 41.0792 10.926C40.9992 12.7306 40.2464 14.4399 38.9691 15.7173Z"
          fill="#1A2737"
        />
      </svg>
    );
  };
  return (
    <>
      <div style={{ display: "flex", flexFlow: "row", height: "100vh" }}>
        <div style={{ flex: "1" }}>
          <img
            src="/Rectangle.jpg"
            alt="Rectangle"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100vh",
            flex: "1",
          }}
        >
          <div
            className="login-form"
            style={{
              myStyles,
              display: "flex",
              flexDirection: "column",
              padding: "70px",

              marginLeft: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "60px",
                objectFit: "cover",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  objectFit: "cover",
                }}
              >
                <MainIcon />
                Agri AI
              </div>

              <div>
                Go back to{" "}
                <a
                  href="https://arms4ai.com/"
                  target="_blank" // Open the link in a new tab
                  rel="noopener noreferrer" // Security measure to prevent exploitation of the `window.opener`
                  style={{ color: "green" }}
                >
                  Website
                </a>
              </div>
            </div>

            <h1 style={{ fontFamily: "Red Hat Display", marginTop: "70px" }}>
              Sign in to your Account
            </h1>

            <div
              style={{ fontFamily: "Red Hat Display", marginBottom: "70px" }}
            >
              Do not have an Account?{" "}
              <span style={{ color: "green" }}>Create account</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: "Red Hat Display",
                    marginBottom: "20px",
                  }}
                ></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    inputStyles,
                    paddingLeft: "70px",
                    position: "relative",
                    zIndex: "0",
                    border: "none",
                    borderBottom: "1px solid gray",
                    boxShadow: "none",
                    marginBottom: "15px",
                    background: "transparent",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{ fontFamily: "Red Hat Display", marginBottom: "5px" }}
                ></label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    inputStyles,
                    paddingLeft: "70px",
                    position: "relative",
                    zIndex: "0",
                    border: "none",
                    borderBottom: "1px solid gray",
                    boxShadow: "none",
                    marginBottom: "15px",
                    background: "transparent",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "10px",
                  marginLeft: "1",
                  fontFamily: "Red Hat Display",
                  marginBottom: "80px",
                  style: "padding-top:10px;padding-bottom:10px",
                }}
              >
                Forgot Password?
              </div>

              <button
                type="submit"
                onClick={handleLoginClick}
                style={buttonStyles}
              >
                <div style={{ fontFamily: "Red Hat Display" }}> Login</div>
              </button>
            </form>
            <DividerHorizontalLoginIcon />
            <div style={{ marginTop: "15px", objectFit: "cover" }}>
              Need help with Sign up? Contact support
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
