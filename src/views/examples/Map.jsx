import React from 'react';
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker
} from 'react-google-maps';
import { Button, Card, CardHeader, Container, Input, Media, Row } from 'reactstrap';

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

    handleToggleOpen = () => {
      this.setState({
        isOpen: true
      });
    }

    handleToggleClose = () => {
      this.setState({
        isOpen: false
      });
    }

    CMap = withScriptjs(withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={ 12 }
        defaultCenter={ { lat: 45.7489, lng: 21.2087 }  }
        defaultOptions={ {
          scrollwheel: false,
          styles: [
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#ebe3cd'
                }
              ]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#523735'
                }
              ]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#f5f1e6'
                }
              ]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#c9b2a6'
                }
              ]
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#dcd2be'
                }
              ]
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#ae9e90'
                }
              ]
            },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dfd2ae'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dfd2ae'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#93817c'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#a5b076'
                }
              ]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#447530'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f5f1e6'
                }
              ]
            },
            {
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#fdfcf8'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f8c967'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#e9bc62'
                }
              ]
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e98d58'
                }
              ]
            },
            {
              featureType: 'road.highway.controlled_access',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#db8555'
                }
              ]
            },
            {
              featureType: 'road.local',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#806b63'
                }
              ]
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dfd2ae'
                }
              ]
            },
            {
              featureType: 'transit.line',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#8f7d77'
                }
              ]
            },
            {
              featureType: 'transit.line',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#ebe3cd'
                }
              ]
            },
            {
              featureType: 'transit.station',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dfd2ae'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#b9d3c2'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#92998d'
                }
              ]
            }
          ]
        } }
      >
        {props.children}
      </GoogleMap>
    )));

    

    render() {
      return (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
                <this.CMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpX55p7sSCdvPgNXplw835klLKJPydUT4"
                  loadingElement={ <div style={ { height: '100%' } } /> }
                  containerElement={ (
                    <div
                      style={ { height: '600px' } }
                      className="map-canvas"
                      id="map-canvas"
                    />
                  ) }
                  mapElement={
                    <div style={ { height: '100%', borderRadius: 'inherit' } } />
                  }
                  center={ { lat: 45.7489, lng: 21.2087 } }
                >
                  {this.props.data.map((item) => (
                    <Marker
                      key={ item.name }
                      position={ { lat: item.lat, lng: item.lng } }
                    >
                      <InfoWindow position={ { lat: item.lat, lng: item.lng } }>
                        <Card className="shadow">
                          <CardHeader className="border-0">
                            <h4 className="mb-0">{item.name}</h4>
                          </CardHeader>
                          <Media className="align-items-center">
                            <img
                              alt="..."
                              src={ require('../../assets/img/theme/bootstrap.jpg') }
                            />
                            <div style={ { display: 'flex', flexDirection: 'column' } }>
                              <div style={ { paddingBottom: '8px' } }>
                                <small className="mb-0">{item.owner}</small>
                              </div>
                              <div style={ { paddingBottom: '8px' } }>
                                <small className="mb-0">{`${item.price} lei / Kg`}</small>
                              </div>
                              <div style={ { paddingBottom: '8px' } }>
                                <small className="mb-0">{`${item.storeName} ,${item.location}`}</small>
                              </div>
                              <Input
                                placeholder="How many"
                                type="number"
                              />
                            </div>

                          </Media>

                          <Button
                            color="secondary"
                            type="button"
                          >
                                  Add to cart
                          </Button>
                        </Card>
                      </InfoWindow>
                    </Marker>
                  ))}


                </this.CMap>
              </Card>
            </div>
          </Row>
        </Container>
      );
    }
}


export const MapWrapper = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={ 12 }
      defaultCenter={ { lat: 45.7489, lng: 21.2087 } }
      defaultOptions={ {
        scrollwheel: false,
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#ebe3cd'
              }
            ]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#523735'
              }
            ]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#f5f1e6'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#c9b2a6'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#dcd2be'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ae9e90'
              }
            ]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#93817c'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#a5b076'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#447530'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#f5f1e6'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#fdfcf8'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#f8c967'
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#e9bc62'
              }
            ]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e98d58'
              }
            ]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#db8555'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#806b63'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8f7d77'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#ebe3cd'
              }
            ]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#b9d3c2'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#92998d'
              }
            ]
          }
        ]
      } }
    >
      {props.data.map((item) => (
        <Marker
          key={ item.name }
          position={ { lat: item.lat, lng: item.lng } }
        />
      ))}
      <Marker position={ { lat: 40.748817, lng: -73.985428 } } />
    </GoogleMap>
  ))
);


class Maps1 extends React.Component {
  render() {
    return (
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper
                data={ this.props.data }
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpX55p7sSCdvPgNXplw835klLKJPydUT4"
                loadingElement={ <div style={ { height: '100%' } } /> }
                containerElement={ (
                  <div
                    style={ { height: '600px' } }
                    className="map-canvas"
                    id="map-canvas"
                  />
                              ) }
                mapElement={
                  <div style={ { height: '100%', borderRadius: 'inherit' } } />
                            }
              />
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
}

export default Maps;
