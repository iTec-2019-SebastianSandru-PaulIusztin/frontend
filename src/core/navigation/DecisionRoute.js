import {Route} from "react-router";
import React from 'react';

export const DecisionRoute = ({ trueComponent, falseComponent, decisionFunc, ...rest }) => (
    <Route
        { ...rest }

        render={
            decisionFunc()
                ? trueComponent
                : falseComponent
        }
    />
);
