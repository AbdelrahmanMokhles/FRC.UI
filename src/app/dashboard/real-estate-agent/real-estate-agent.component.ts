import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { StatsComponent } from './stats/stats.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';
import { TopChannelsComponent } from './top-channels/top-channels.component';
import { RecentClientsComponent } from './recent-clients/recent-clients.component';
import { MyFeaturedListingsComponent } from './my-featured-listings/my-featured-listings.component';
import { RevenueGoalProgressComponent } from './revenue-goal-progress/revenue-goal-progress.component';
import { PropertiesByCountryComponent } from './properties-by-country/properties-by-country.component';
import { MobileAppComponent } from './mobile-app/mobile-app.component';
import { LatestTransactionsComponent } from './latest-transactions/latest-transactions.component';
import { ClientRatingsComponent } from './client-ratings/client-ratings.component';

@Component({
    selector: 'app-real-estate-agent',
    imports: [WelcomeComponent, StatsComponent, TotalRevenueComponent, TopChannelsComponent, RecentClientsComponent, MyFeaturedListingsComponent, RevenueGoalProgressComponent, PropertiesByCountryComponent, MobileAppComponent, LatestTransactionsComponent, ClientRatingsComponent],
    templateUrl: './real-estate-agent.component.html',
    styleUrl: './real-estate-agent.component.scss'
})
export class RealEstateAgentComponent {}