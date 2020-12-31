import Avatar from '../components/avatar'

export default function UserHeader () {
  return (
    <>
      <Avatar name="Andres Carmona"
              picture="/assets/me.jpeg"/>
      <p className="text-gray-500 mb-5 max-w-2xl text-center">
	      Full Stack Web Developer, computer enthusiast, programming nerd, geek & computer lover. Lead developer at <a href="https://www.insp.mx" target="_blank"
      className="font-semibold text-indigo-700 hover:text-indigo-600">INSP</a>
      </p>
    </>
  )
}
