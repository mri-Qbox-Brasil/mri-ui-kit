import type { Meta, StoryObj } from '@storybook/react';
import {
  MriAccordion,
  MriAccordionItem,
  MriAccordionTrigger,
  MriAccordionContent,
} from './MriAccordion';

const meta: Meta<typeof MriAccordion> = {
  title: 'Molecules/MriAccordion',
  component: MriAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
export const Single: StoryObj = {
  render: () => (
    <MriAccordion type="single" collapsible className="w-[480px]">
      <MriAccordionItem value="item-1">
        <MriAccordionTrigger>O que é o MRI Qbox?</MriAccordionTrigger>
        <MriAccordionContent>
          Conjunto de recursos para servidores FiveM rodando o framework Qbox,
          com foco em qualidade, performance e suporte ativo.
        </MriAccordionContent>
      </MriAccordionItem>
      <MriAccordionItem value="item-2">
        <MriAccordionTrigger>Como instalo?</MriAccordionTrigger>
        <MriAccordionContent>
          Use o instalador oficial — ele cuida de artefatos, banco e
          configuração inicial.
        </MriAccordionContent>
      </MriAccordionItem>
      <MriAccordionItem value="item-3">
        <MriAccordionTrigger>Funciona em ESX?</MriAccordionTrigger>
        <MriAccordionContent>
          Não. Os recursos são desenhados para Qbox e dependem da arquitetura
          dele.
        </MriAccordionContent>
      </MriAccordionItem>
    </MriAccordion>
  ),
};

export const Multiple: StoryObj = {
  render: () => (
    <MriAccordion type="multiple" className="w-[480px]">
      <MriAccordionItem value="a">
        <MriAccordionTrigger>Seção A</MriAccordionTrigger>
        <MriAccordionContent>Pode abrir junto com B e C.</MriAccordionContent>
      </MriAccordionItem>
      <MriAccordionItem value="b">
        <MriAccordionTrigger>Seção B</MriAccordionTrigger>
        <MriAccordionContent>Conteúdo da seção B.</MriAccordionContent>
      </MriAccordionItem>
      <MriAccordionItem value="c">
        <MriAccordionTrigger>Seção C</MriAccordionTrigger>
        <MriAccordionContent>Conteúdo da seção C.</MriAccordionContent>
      </MriAccordionItem>
    </MriAccordion>
  ),
};

export const DefaultOpen: StoryObj = {
  render: () => (
    <MriAccordion type="single" collapsible defaultValue="item-2" className="w-[480px]">
      <MriAccordionItem value="item-1">
        <MriAccordionTrigger>Fechado</MriAccordionTrigger>
        <MriAccordionContent>Item começa fechado.</MriAccordionContent>
      </MriAccordionItem>
      <MriAccordionItem value="item-2">
        <MriAccordionTrigger>Aberto por padrão</MriAccordionTrigger>
        <MriAccordionContent>Este abre automaticamente.</MriAccordionContent>
      </MriAccordionItem>
    </MriAccordion>
  ),
};
