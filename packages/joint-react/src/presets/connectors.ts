import type { connectors as connectorTypes } from '@joint/core';
import { curve } from '@joint/core/connectors';

/**
 * Curve connector with outwards tangent direction.
 * @param sourcePoint
 * @param targetPoint
 * @param routePoints
 * @param _args
 * @param linkView
 */
export const outwardsCurveConnector: connectorTypes.Connector = (sourcePoint, targetPoint, routePoints, _args, linkView) =>
  curve(sourcePoint, targetPoint, routePoints, {
    sourceDirection: curve.TangentDirections.OUTWARDS,
    targetDirection: curve.TangentDirections.OUTWARDS,
  }, linkView);
