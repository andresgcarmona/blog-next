import cn from 'classnames'

export default function Author({ name, picture, size='lg' }) {
	return (
		<div className="flex items-center">
			<img src={picture} alt={name} className={cn('rounded-full mb-2 block mr-2 w-12 h-12')} />
			<div className="text-xl font-semibold">{name}</div>
		</div>
	)
}
