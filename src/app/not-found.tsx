'use client';
import {Container, H3} from '@salutejs/plasma-ui';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Container>
            <H3 style={{textAlign: 'center'}}>404</H3>
            <p>
                <Link style={{textAlign: 'center'}} href="/">
                    Back
                </Link>
            </p>
        </Container>
    );
}
