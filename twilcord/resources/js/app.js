import './bootstrap'

import { InertiaApp } from '@inertiajs/inertia-react'
import React from 'react'
import {render} from 'react-dom'
//import { InertiaProgress } from '@inertiajs/progress';

const app = document.getElementById('app')

render(
    <InertiaApp 
        initialPage={JSON.parse(app.dataset.page)}
        resolveComponent={name => import(`./Pages/${name}`).then(
            module => module.default
        )}
    />,
    app
)

//InertiaProgress.init({ color: '#4B5563' });
