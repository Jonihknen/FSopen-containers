import Todo from "./Todo"
import  {render} from '@testing-library/react'


it('component renders right', () => {
const todo = {
    text: 'test 123',
    done: false
}
const result = render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}}/>)
expect(result.container).toHaveTextContent('test 123');
})
