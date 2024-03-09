import {redirect} from 'next/navigation';
import {Component, ReactNode} from 'react';

import errorHandler from '@/core/exceptions/ErrorHandler';

interface IProps {
    children?: ReactNode;
}

interface IState {
    hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {hasError: false};
    }

    static getDerivedStateFromError(err: Error) {
        if (err.message.includes('Not found')) {
            return redirect('/404');
        }
        errorHandler(err);
        return {hasError: true};
    }

    componentDidMount(): void {
        window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
    }

    componentWillUnmount(): void {
        window.removeEventListener('unhandledrejection', this.promiseRejectionHandler);
    }

    promiseRejectionHandler = () => {
        this.setState({hasError: true});
    };

    render() {
        if (this.state.hasError) {
            return <div>Что-то пошло не так !</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
