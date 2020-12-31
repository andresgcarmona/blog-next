import cn from 'classnames'

export default function Avatar({ name, picture, size='lg' }) {
	return (
		<div className="flex flex-col items-center">
			<img src={picture} alt={name} className={cn('rounded-full mb-2', {'w-40 h-40': size === 'lg', 'w-12 h-12': size !== 'lg'})} />
			<div className="text-3xl font-semibold">{name}</div>
		</div>
	)
}
