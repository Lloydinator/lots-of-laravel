import React from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const Profile = ({ account, user, errors }) => {
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="https://picsum.photos/400"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-24">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                    { user.name }
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                        <strong>Balance:</strong> ${ account.balance } 
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex justify-center">
                        <form className="w-full max-w-sm" method="POST" action={ route('send-money') }>
                            <div className="mb-6">
                                <div className="md:flex md:items-center">
                                  <div className="md:w-1/3">
                                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                      Email
                                  </label>
                                  </div>
                                  <div className="md:w-2/3">
                                      <input className={`${Object.keys(errors).length > 0 ? 'border-red-500' : 'border-gray-200'} bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`} 
                                        type="text" name="email" placeholder="person@example.net" />
                                  </div>
                                </div>
                                {Object.keys(errors).length > 0 ?
                                  (<span class="font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    This is an error
                                  </span>) : null
                                }
                            </div>
                            <div className="mb-6">
                                <div className="md:flex md:items-center">
                                  <div className="md:w-1/3">
                                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                      Amount
                                  </label>
                                  </div>
                                  <div className="md:w-2/3 flex">
                                      <span className="leading-10 mr-2">$</span><input className={`${Object.keys(errors).length > 0 ? 'border-red-500' : 'border-gray-200'} bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`} 
                                        type="text" name="amount" placeholder="3.00" />
                                  </div>
                                </div>
                                {Object.keys(errors).length > 0 ?
                                  (<span class="font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    This is an error
                                  </span>) : null
                                }
                            </div>
                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3"></div>
                                <div className="md:w-2/3">
                                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    Send
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default Profile