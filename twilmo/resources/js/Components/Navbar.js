import React, {useState} from 'react'

const Navbar = props => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <>
      <nav
        className={
          (props.transparent
            ? "top-0 absolute z-50 w-full"
            : "relative shadow-lg bg-white") +
          " flex flex-wrap items-center justify-between px-2 py-3 "
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
              href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
            >
              TWILMO
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-white" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar