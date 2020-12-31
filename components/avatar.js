export default function Avatar({ name, picture }) {
	return (
		<div className="flex flex-col items-center">
			<img src={picture} alt={name} className="w-40 h-40 rounded-full mb-2"/>
			<div className="text-3xl font-semibold">{name}</div>
		</div>
	)
}
