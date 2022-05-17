import { Fato } from './fato.model';
export interface Problema{
    id?: Number,
    idSistema: string,
    nomeProblema: string,
    descricao: string,
    fatos: Fato[],
    resposta: string,
}