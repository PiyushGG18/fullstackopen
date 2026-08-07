import Part from './Part'

const Content = ({parts}) => {
    var total = parts.reduce((sum, part) => sum += part.exercises, 0)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <strong> total of {total} exercises </strong>
        </div>
    )
}

export default Content