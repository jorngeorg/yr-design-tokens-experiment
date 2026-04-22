import { Meta, StoryObj } from "@storybook/react-vite";
import { Pollen } from "./Pollen";

const meta: Meta = {
  title: "Components/Pollen",
  component: Pollen,
};

export default meta;

type Story = StoryObj;

const pollenForecast = [
            {
                "date": "I dag",
                "distributions": {
                    "severe": {
                        "pollenTypes": [
                            {
                                "id": "birch",
                                "name": "Bjørk"
                            }
                        ],
                        "distributionName": "Kraftig"
                    },
                    "low": {
                        "pollenTypes": [
                            {
                                "id": "salix",
                                "name": "Salix"
                            }
                        ],
                        "distributionName": "Beskjeden"
                    }
                }
            },
            {
                "date": "I morgen",
                "distributions": {
                    "severe": {
                        "pollenTypes": [
                            {
                                "id": "birch",
                                "name": "Bjørk"
                            }
                        ],
                        "distributionName": "Kraftig"
                    },
                    "low": {
                        "pollenTypes": [
                            {
                                "id": "salix",
                                "name": "Salix"
                            }
                        ],
                        "distributionName": "Beskjeden"
                    }
                }
            }
        ];

export const PollenCard: Story = {
  render: () => (
    <Pollen title="Pollenvarsel" subtitle="Østlandet med Oslo" forecast={pollenForecast} />
  )
}