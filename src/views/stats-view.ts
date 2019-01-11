import { html, property } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { statsSelector } from '../redux/reducer';
import '@vaadin/vaadin-charts';
import { State } from '../models/state';
import { BaseView } from './base-view';

interface ChartConfig {
  name: string;
  y: number;
}

class StatsView extends connect(store)(BaseView) {
  @property()
  private chartConfig: ChartConfig[];
  private hasTodos: boolean = false;

  stateChanged(state: State) {
    const stats = statsSelector(state);
    this.chartConfig = [
      { name: 'Completed', y: stats.completed },
      { name: 'Active', y: stats.active }
    ];

    this.hasTodos = state.todos.length > 0;
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
        #chart {
          margin: 50px auto;
        }
      </style>

      ${this.getChart()}
    `;
  }

  getChart() {
    if (this.hasTodos) {
      return html`
        <vaadin-chart type="pie">
          <vaadin-chart-series .values="${this.chartConfig}">
          </vaadin-chart-series>
        </vaadin-chart>
      `;
    } else {
      return html`
        <p>Nothing to do! 🌴</p>
      `;
    }
  }
}

customElements.define('stats-view', StatsView);
