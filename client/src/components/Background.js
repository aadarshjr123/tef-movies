import React from 'react';

const Background = ( { children } ) =>
{
    return (
       
        <body class=" h-full w-full bg-white dark:bg-hotstar transition ease-in-out delay-150">
            {children}
        </body>
    )
}

export default Background;