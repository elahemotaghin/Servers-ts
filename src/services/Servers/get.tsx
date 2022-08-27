import React from 'react'
import IServer from 'interfaces/Server'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

export const useGetServers = (url:string) => {
    const fetchServers = (): Promise<IServer[]> => axios.get(url).then(response => response.data)
    const {data = [], isLoading, refetch} = useQuery(['servers'], fetchServers)
    return {data, isLoading, refetch}
}  

export const useGetServerById = (url:string) => {
    const fetchServers = (): Promise<IServer> => axios.get(url).then(response => response.data)
    const {data, isLoading} = useQuery(['server'], fetchServers)
    return {data, isLoading}
}