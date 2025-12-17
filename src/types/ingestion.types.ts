export interface IngestionStatusResponse {
    state: string;
    started_at?: string;
    finished_at?: string;
    error?: string;

}