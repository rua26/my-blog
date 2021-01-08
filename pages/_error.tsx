import React from 'react';

// Languages
import { AppInitialProps } from 'next/app';
import { useTranslation } from '@languages/i18n';

/**
 * Error page
 * @author: Le Thang
 */
interface Props extends AppInitialProps {
    statusCode: number;
}
interface INextErrorPage<P = {}> extends React.FC<P> {
    getInitialProps: ({ res, err }: any) => Promise<{ namespacesRequired: string[]; statusCode: number }>;
}

const ErrorPage: INextErrorPage<Props> = (props) => {
    const { statusCode } = props;
    const { t } = useTranslation(['common']);
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <p className="text-white">{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>
        </div>
    );
};

ErrorPage.getInitialProps = async ({ res, err }: any) => {
    let statusCode = null;
    if (res) {
        ({ statusCode } = res);
    } else if (err) {
        ({ statusCode } = err);
    }
    return {
        namespacesRequired: ['common'],
        statusCode,
    };
};

export default ErrorPage;
