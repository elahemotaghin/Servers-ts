import React from 'react'
import {
    Link as LinkRouter,
    useLocation,
  } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const breadcrumbNameMap = (path:string ,id:any) => {
    if(path==='/applications')
        return 'برنامه ها'
    else if(path.includes('/applications/'))
        return ' برنامه شماره'+id;
    else if(path==='/servers')
        return 'سرورهای اختصاصی';
    else
     return ' سرور شماره'+id;
  }

const RouterBreadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    return(
        <>
        <Breadcrumbs aria-label="breadcrumb" separator=">">
            <LinkRouter color="inherit" to="/">
                خانه
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                <Typography color="text.primary" key={to}>
                    {breadcrumbNameMap(to, pathnames[index])}
                </Typography>
                ) : (
                <LinkRouter color="inherit" to={to} key={to}>
                    {breadcrumbNameMap(to, '')}
                </LinkRouter>
                );
            })}
        </Breadcrumbs>
        </>
    );
}
export default RouterBreadcrumbs;