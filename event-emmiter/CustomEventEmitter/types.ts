export type Listener = (...data: any[]) => void;
export type Listeners = Set<Listener>;
export type Events = Map<string, Listeners>;
