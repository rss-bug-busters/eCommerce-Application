export interface PromoCodeProperties {
  code: string;
  description: string;
}

const promoCodes: PromoCodeProperties[] = [
  { code: 'POSTER15', description: 'All-15%' },
  {
    code: 'POSTER20',
    description: 'All-20%',
  },
];

export default promoCodes;
