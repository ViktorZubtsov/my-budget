import {SWRProvider} from '@/core/provider/SWRProvider';

const GoalX = async ({params}: {params: {slug: string}}) => {
    return (
        <SWRProvider
            fallback={{
                test: [params.slug],
            }}
        >
            <div>sde</div>
        </SWRProvider>
    );
};

export default GoalX;
