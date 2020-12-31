import Avatar from '../components/avatar'

export default function UserHeader() {
	return (
		<>
			<Avatar name="Andres Carmona"
			        picture="/assets/me.jpeg"/>
			<p className="text-gray-500 mb-5 max-w-2xl text-center">Full stack developer with a passion for product development & technology. Lead developer at CHEQROOM.</p>
		</>
	)
}
