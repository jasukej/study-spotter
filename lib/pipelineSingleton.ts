import { pipeline } from '@xenova/transformers'

type PipelineType = {
    task: string;
    model: string;
    instance: any;
    getInstance: (progress_callback?: (progress: any) => void) => Promise<any>;
};


const P = () => class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Xenova/bert-base-multilingual-uncased-sentiment';
    static instance: any = null;

    static async getInstance(progress_callback?: (progress: any) => void) {
        if (this.instance === null) {
        this.instance = await pipeline('feature-extraction', this.model, { progress_callback });
        }
        return this.instance;
    }
};

let PipelineSingleton: PipelineType;
if (process.env.NODE_ENV !== 'production') {
  if (!(global as any).PipelineSingleton) {
    (global as any).PipelineSingleton = P();
  }
  PipelineSingleton = (global as any).PipelineSingleton;
} else {
  PipelineSingleton = P();
}

export default PipelineSingleton;